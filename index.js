document
  .getElementById("pdfUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Show the loader
      document.getElementById("loader").classList.add("active");

      fetch("http://ec2-13-127-253-113.ap-south-1.compute.amazonaws.com:5000/office-to-pdf", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Convert Base64 string to a Blob
          const byteCharacters = atob(data.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "application/pdf" });

          // Create a URL for the Blob
          const url = URL.createObjectURL(blob);

          // Create a link element
          const link = document.createElement("a");
          link.href = url;
          link.download = "PDFify_converted.pdf"; // Name of the downloaded file
          document.body.appendChild(link); // Append link to body (required in Firefox)
          link.click();

          // Clean up
          setTimeout(() => {
            document.body.removeChild(link); // Remove link from body
            URL.revokeObjectURL(url); // Revoke the URL
          }, 100);

          // Hide the loader
          document.getElementById("loader").classList.remove("active");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Hide the loader in case of error too
          document.getElementById("loader").classList.remove("active");
        });
    }
  });
