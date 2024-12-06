export const createPrediction = async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    // Call the Flowise API endpoint here..
    const flowiseData = {
      question: message,
    };

    //Call the api
    const response = await fetch(
        `${process.env.FLOWISE_URL}/api/v1/prediction/${process.env.FLOW_ID}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.FLOWISE_API_KEY}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(flowiseData)
        }
    );

    //Setting the data
    const data = await response.json();
    console.log(data.text);

   res.status(200).json({ message: data.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
