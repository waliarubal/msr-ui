import React from 'react'
import axios from 'axios'
import { services } from '../common/constant'

export default class RequestFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      files : [],
      case_exists : true,
    }
  }

  componentDidMount() {
    this.setState({ loading: true })


     
        let hit_url = services.baseUrl + services.getFilesOfCRMcase + '?id=' + this.props.match.params.id
        console.log('hit_url')
        console.log(hit_url)
        axios.get(hit_url)
          .then(res => {
            
            console.log(res.data)
            if (res.data.success) {
            this.setState({ files : res.data.files})
            }
            else {
              this.setState({ case_exists : false })
            }
          })
          .catch(err => {
            console.log(err)
          })
    

  }
  toDataURL = (url, fileName) => {
    axios({
      url,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const blobbedResponse = window.URL.createObjectURL(new Blob([response.data]));
      console.log('blobbedResponse')
      console.log(blobbedResponse)
      const link = document.createElement('a');
      link.href = blobbedResponse;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });

  }

  render() {
   {
    //send get request to getFilesOfCRMcase with the crm_id in query
   
   }
    return (
      <React.Fragment>
        <div className="row ">
          <div className="col-md-12">
          <h2>Case Files for CASE ID : {this.props.match.params.id}</h2>
          {/* // if files is empty then show no files else show files */}
            {
              this.state.case_exists? '' : <h3>No such case exists</h3>
            }
            {
            this.state.files.length === 0 ? <h3>No Files</h3> :
            this.state.files.map((file, index) => {
              return (
                // black out background if index is even
                <div className={index % 2 === 1 ? 'bg-dark text-white' : ''} key={index}>
                  <div className="col-md-12 py-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-12">
                            <h3>{file.originalname}</h3>
                          </div>
                          <div className="col-md-12">
                            
                            <p>({Math.round(file.size / 1024)} kb)</p>
                            
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            {/* download button when clicked gets the file from the server */}
                            <a onClick={() => {
                              this.toDataURL((services.baseUrl + '/' + file.path).replace("\\/g", "/"), file.originalname)
                              // console.log('file name : ')
                              let fileNameTest = (services.baseUrl + '/' + file.path).replace("\\/g", "/")
                              console.log(fileNameTest)
                            }} className='download-file'> <i className="fa fa-download" title={file.originalname} ></i> </a>

                            {/* a captcha box which checks if the user is a human or a bot */}
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

