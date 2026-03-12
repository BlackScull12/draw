const imageInput = document.getElementById('imageInput');
const generateBtn = document.getElementById('generateBtn');
const stepsContainer = document.getElementById('stepsContainer');

generateBtn.addEventListener('click', async () => {
  if (!imageInput.files[0]) {
    alert("Please upload an image first!");
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const imageData = reader.result; // base64 image
    
    stepsContainer.innerHTML = '<p>Generating steps... please wait.</p>';

    try {
      // Simulate API call for demonstration
      // In reality, you would call an AI API to generate images
      const steps = await generateDrawingSteps(imageData);

      // Show steps
      stepsContainer.innerHTML = '';
      steps.forEach((step, index) => {
        const div = document.createElement('div');
        div.className = 'step';
        div.innerHTML = `<h4>Step ${index + 1}</h4><img src="${step}" alt="Step ${index + 1}">`;
        stepsContainer.appendChild(div);
      });

    } catch (error) {
      stepsContainer.innerHTML = '<p>Failed to generate steps.</p>';
      console.error(error);
    }
  };

  reader.readAsDataURL(file);
});

// Fake API function for now
async function generateDrawingSteps(base64Image) {
  // For testing, just return the same image 20 times
  const steps = [];
  for (let i = 0; i < 20; i++) {
    steps.push(base64Image);
  }
  return steps;
}
