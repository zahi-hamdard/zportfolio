// resume.js
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a PDF version of the resume
            generatePDF();
        });
    }
    
    function generatePDF() {
        // Show loading message
        const catMsg = document.getElementById('cat-message');
        if (catMsg) {
            catMsg.textContent = "Preparing your resume... 📄";
            catMsg.classList.add('show');
        }
        
        // Use html2pdf library to generate PDF
        const element = document.getElementById('resume');
        const opt = {
            margin: 10,
            filename: 'Zahidullah_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Add html2pdf library dynamically if not already loaded
        if (typeof html2pdf !== 'undefined') {
            html2pdf().from(element).set(opt).save();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = function() {
                html2pdf().from(element).set(opt).save();
            };
            document.head.appendChild(script);
        }
        
        // Hide message after 3 seconds
        setTimeout(() => {
            if (catMsg) catMsg.classList.remove('show');
        }, 3000);
    }
});