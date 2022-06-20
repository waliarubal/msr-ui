import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { initLoadData, getInitData } from '../../state/home'

export const mapStateToProps = createStructuredSelector({
    getInitData: getInitData
})

const mapDispatchToProps = dispatch => ({
    initLoadData: () => dispatch(initLoadData())
})

export default connect(mapStateToProps, mapDispatchToProps)