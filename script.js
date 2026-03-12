const imageInput = document.getElementById('imageInput');
const generateBtn = document.getElementById('generateBtn');
const stepsContainer = document.getElementById('stepsContainer');

generateBtn.addEventListener('click', async () => {
  if (!imageInput.files[0]) {
    alert("Please upload an image!");
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const imageData = reader.result; // Base64

    stepsContainer.innerHTML = '<p>Generating 20 pencil sketch steps, please wait...</p>';

    try {
      const response = await fetch('/generate-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
      });

      const result = await response.json();
      const steps = result.steps;

      stepsContainer.innerHTML = '';
      steps.forEach((step, idx) => {
        const div = document.createElement('div');
        div.className = 'step';
        div.innerHTML = `<h4>Step ${idx + 1}</h4><img src="${step}" alt="Step ${idx + 1}">`;
        stepsContainer.appendChild(div);
      });

    } catch (err) {
      console.error(err);
      stepsContainer.innerHTML = '<p>Failed to generate steps.</p>';
    }
  };

  reader.readAsDataURL(file);
});
