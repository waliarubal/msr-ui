import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { signupReq, getNewUser, fetchProgress, resetSignup } from '../../state/login'

export const mapStateToProps = createStructuredSelector({
    getNewUser: getNewUser,
    fetchProgress: fetchProgress
})

const mapDispatchToProps = dispatch => ({
    signupReq: payload => dispatch(signupReq(payload)),
    resetSignup: () => dispatch(resetSignup())
})

export default connect(mapStateToProps, mapDispatchToProps)