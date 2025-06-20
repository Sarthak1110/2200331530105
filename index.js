const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXJ0aGFrdGVvdGlhMzBAZ21haWwuY29tIiwiZXhwIjoxNzUwMzk4ODcxLCJpYXQiOjE3NTAzOTg1NzEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0ODYyYjc1ZC00NmI5LTRiMTctOTVmNy03MmQyZmNiY2U5ZGUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzYXJ0aGFrIiwic3ViIjoiNTVjYmM5MDctYTBmZS00OTc4LTlhYjItYTY3ZmE4ZmU3NDViIn0sImVtYWlsIjoic2FydGhha3Rlb3RpYTMwQGdtYWlsLmNvbSIsIm5hbWUiOiJzYXJ0aGFrIiwicm9sbE5vIjoiMjIwMDMzMTUzMDEwNSIsImFjY2Vzc0NvZGUiOiJyZlF6RlEiLCJjbGllbnRJRCI6IjU1Y2JjOTA3LWEwZmUtNDk3OC05YWIyLWE2N2ZhOGZlNzQ1YiIsImNsaWVudFNlY3JldCI6IkhmU21lQkFUdkhucEtVVlYifQ.0pEtxqoyGeROapCJXoYUgMFkvSXSLDaQEaWB6sr5E-g";
const WINDOW_SIZE = 10;
let window = [];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome! Use POST /register or /token to interact.');
});

app.post('/register', async (req, res) => {
    const registrationData = {
        email: "sarthakteotia31@gmail.com",
        name: "sarthak",
        mobileNo: "9520100734",
        githubUsername: "Sarthak1110",
        rollNo: "2200331530105",
        collegeName: "Rajkumar Goel Institute of Technology",
        accessCode: "rfQzFQ"
    };

    try {
        const response = await axios.post(
            "http://20.244.56.144/evaluation-service/register",
            registrationData,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        res.status(200).json({
            message: "Registration successful!",
            data: response.data
        });
    } catch (err) {
        res.status(err.response?.status || 500).json({
            message: "Registration failed",
            error: err.response?.data || err.message
        });
    }
});

app.post('/token', async (req, res) => {
    const payload = {
        email: "sarthakteotia30@gmail.com",
        name: "sarthak",
        rollNo: "2200331530105",
        accessCode: "rfQzFQ",
        clientID: "55cbc907-a0fe-4978-9ab2-a67fa8fe745b",
        clientSecret: "HfSmeBATvHnpKUVV"  
    };

    try {
        const response = await axios.post(
            "http://20.244.56.144/evaluation-service/auth",
            payload,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        res.json({
            message: "Token received successfully",
            token: response.data.access_token
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get token",
            error: error.response?.data || error.message
        });
    }
});

