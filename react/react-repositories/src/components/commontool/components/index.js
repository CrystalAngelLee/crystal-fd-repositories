import React from 'react';
import ReactDOM from 'react-dom';
import '../style/index.css';

class ChineseRegTool extends React.Component {
  static defaultProps = {
    prefixCls: 'cr-chineseReg-tool',
  }

  constructor(props) {
    super(props);
    this.state = {
      clickType: '',
      textValue: [],
      fileValue: null,
      fileContent: '',
      lableVisibel: false,
      filePath: '',
      searchNoData: false,
    }
  }

  onHandleClick = () => {
    const { textValue, fileContent, filePath, clickType } = this.state;
    let textAreaValue = fileContent !== '' ? fileContent : document.getElementById('text').value;
    let regNote = /(?:|\n|\r)\s*\/\/.*(?:\r|\n|$)/ig;
    let getlabel = /getLabel(\([^\)]+\))/ig;
    let _regNote =/\/\*(\s|.)*?\*\//g;
    let regChinese = /[\u4e00-\u9fa5]+/ug;
    if (textAreaValue) {
      let temp = textAreaValue.replace(_regNote,'');
      temp = temp.replace(getlabel, '');
      temp = temp.replace(regNote, '');
      temp = temp.match(regChinese);
      temp = Array.from(new Set(temp));
      if (clickType === 'folder' && temp.length>0) temp = [filePath, ...temp]
      if (clickType === 'folder') temp = [...textValue, ...temp]
      temp.length === 0 && this.setState({searchNoData: true})
      this.setState({textValue: temp})
    }
  }

  getLabel = () => {
    const { fileContent } = this.state;
    let textAreaValue = fileContent !== '' ? fileContent : document.getElementById('text').value;
    let getlabel = /getLabel(\([^\)]+\))/ig;
    if (textAreaValue) {
      let temp = textAreaValue.match(getlabel);
      this.setState({textValue: temp})
    }
  }

  handleChange = (key) => {
    this.setState({clickType: key, textValue: [], lableVisibel: false, searchNoData: false});
    key === 'text' && this.setState({lableVisibel: true});
    // let input = ReactDOM.findDOMNode(this.refs.folder);
    // if (input) {
    //   input.setAttribute('webkitdirectory', '')
    //   input.setAttribute('directory', '')
    //   input.setAttribute('multiple', '')
    // }
  }

  // 文件夹读取
  folderChange = (files) => {
    let folder = ReactDOM.findDOMNode(this.refs.folder).files;
    if (folder) {
      for(let i = 0; i < folder.length; i++) {
        let file = folder[i];
        this.setContent(file);
      }
    }
  }

  // 文件读取
  filedChange = (files) => {
    let file = ReactDOM.findDOMNode(this.refs.file).files[0];
    this.setContent(file);
  }

  setContent = (file) => {
    let _this = this;
    let reader = new FileReader();
    reader.readAsText(file,'utf-8');
    reader.onload = function() {
      _this.state.clickType !== 'folder' ? 
      _this.setState({lableVisibel: true, fileContent: this.result}) :
      _this.setState({fileContent: this.result, filePath: `path: ${file.webkitRelativePath}`},()=>_this.onHandleClick());
    }
  }

  renderHeader = () => {
    const { clickType, lableVisibel } = this.state;
    const textArr = [
      {
        key: 'fiflter',
        name: '点击筛选',
        click: this.onHandleClick
      },
      {
        key: 'getlabel',
        name: 'getlabel',
        click: this.getLabel
      },
    ]
    const renderText = lableVisibel && textArr.map(item => {
      return (
        <span 
          key={item.key} 
          className={item.key} 
          onClick={item.click}
        >{item.name}</span>
      )
    })
    let option;
    switch(clickType) {
      case 'folder':
        option = [
          renderText,
          <input type="file" key='folder' ref='folder' webkitdirectory="true" directory="true" multiple onChange={this.folderChange}/>
        ]
        break;
      case 'filed':
        option = [
          renderText,
          <input type="file" key='file' ref="file" onChange={this.filedChange}/>
        ]
        break;
      case 'text':
        option = renderText
        break;
      default: return;
    }
    return option;
  }

  render() {
    const { prefixCls } = this.props;
    const { clickType, textValue, searchNoData } = this.state;
    const headerArr = [
      {
        key: 'folder',
        name: '检测文件夹',
      },
      {
        key: 'filed',
        name: '检测文件',
      },
      {
        key: 'text',
        name: '检测文本',
      }
    ]
    const renderNodata = (
      <div className='no-data'>
        <h1>Nothing for you</h1>
      </div>
    )
    const renderNoSearch = (
      <div className='no-data'>
        <h1>暂无查询数据</h1>
      </div>
    )
    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-container`}>
          <div className={`${prefixCls}-container-statement`}>
            声明：所检测文件中所有有gelLabel标签的均不显示，如有需要可以从gelLabel中查看已翻译过的数据
          </div>
          <div className={`${prefixCls}-container-header`}>
            {
              headerArr.map(item => {
                return (
                  <span 
                    key={item.key} 
                    className={item.key} 
                    onClick={() => this.handleChange(item.key)}
                  >{item.name}</span>
                )
              })
            }
            { this.renderHeader() }
          </div>
          <div className={`${prefixCls}-container-main`}>
            <div className={`${prefixCls}-container-main-underDetection`} style={{flex: clickType === 'text' ? '1' : '0'}}>
              {clickType === 'text' && <textarea id='text'/>}
            </div>
            <div className={`${prefixCls}-container-main-detection`}>
              {
                !textValue || searchNoData ? renderNoSearch :
                textValue.length === 0 ? renderNodata : 
                textValue.map((item, index) => {
                  return <div key={index}>{item}</div>
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChineseRegTool