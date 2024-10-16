import axios from 'axios';

const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        address: formData.address,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
    };

    try {
        const response = await axios.post('http://your-backend-url/api/register', userData);
        console.log(response.data.message);
    } catch (error) {
        console.error('Error registering user:', error.response.data.message);
    }
};
