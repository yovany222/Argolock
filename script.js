// Função para processar a imagem
async function processImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        const image = new Image();
        image.onload = async function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            // Aumentar brilho
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] += Math.floor(imageData.data[i] * 0.01); // Aumenta o brilho em 1%
                imageData.data[i + 1] += Math.floor(imageData.data[i + 1] * 0.01);
                imageData.data[i + 2] += Math.floor(imageData.data[i + 2] * 0.01);
            }
            ctx.putImageData(imageData, 0, 0);

            // Baixar a imagem processada ao clicar no link
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = canvas.toDataURL();

            // Adicionar classe para sublinhar o link ao clicar em processar
            downloadLink.classList.add('ready-to-download');

            // Definir atributos do link para download
            downloadLink.setAttribute('download', 'imagem_processada.png');
        };
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
