document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('pdf-canvas');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageNumSpan = document.getElementById('page-num');
    const pageCountSpan = document.getElementById('page-count');

    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;
    const scale = 1.5;

    // Initialize PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    function renderPage(num) {
        pageRendering = true;
        
        pdfDoc.getPage(num).then(function(page) {
            const viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };

            const renderTask = page.render(renderContext);

            renderTask.promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
                updateUI();
            });
        });
    }

    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    function onPrevPage() {
        if (pageNum <= 1) return;
        pageNum--;
        queueRenderPage(pageNum);
    }

    function onNextPage() {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        queueRenderPage(pageNum);
    }

    function updateUI() {
        pageNumSpan.textContent = pageNum;
        prevButton.disabled = pageNum <= 1;
        nextButton.disabled = pageNum >= pdfDoc.numPages;
    }

    // Load the PDF
    pdfjsLib.getDocument('file/Resume.pdf').promise.then(function(pdf) {
        pdfDoc = pdf;
        pageCountSpan.textContent = pdf.numPages;
        renderPage(pageNum);
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        canvas.insertAdjacentHTML('afterend', '<p class="error-message">Error loading PDF. Please try again later.</p>');
    });

    // Button event listeners
    prevButton.addEventListener('click', onPrevPage);
    nextButton.addEventListener('click', onNextPage);

    // Touch events for mobile swipe
    let touchStartX = null;
    let touchEndX = null;

    canvas.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    });

    canvas.addEventListener('touchmove', function(e) {
        touchEndX = e.touches[0].clientX;
    });

    canvas.addEventListener('touchend', function() {
        if (!touchStartX || !touchEndX) return;
        
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                onNextPage();
            } else {
                onPrevPage();
            }
        }
        
        touchStartX = null;
        touchEndX = null;
    });
});
