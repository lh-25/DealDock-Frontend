import * as authService from '../../services/authService'

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const newUserResponse = await authSerivce.signup(formData)
        props.setUser(newUserResponse.user)
        navigate('/')
    }catch (err) {
        updateMessage(err.message)
    }
}