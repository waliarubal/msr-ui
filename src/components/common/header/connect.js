import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getRole } from '../../../state/login'

export const mapStateToProps = createStructuredSelector({
    getRole:getRole
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)