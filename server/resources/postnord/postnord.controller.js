const axios = require('axios');

const getServicePoints = async (req, res) => {
  try {
    const postalCode = req.query.postcode;
    const response = await axios.get(
      'https://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress',
      {
        params: {
          apikey: process.env.POSTNORD_API_KEY,
          returnType: 'json',
          countryCode: 'SE',
          postalCode: postalCode,
        },
      }
    );
    res
      .status(200)
      .json(response.data.servicePointInformationResponse.servicePoints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getServicePoints };
