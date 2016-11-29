import React, {Component} from 'react';
import {decrypt, encrypt, message} from 'openpgp';

export default class App extends Component {

  state = {
    encryptMessage: '',
    encryptPassword: '',
    decryptMessage: '',
    decryptPassword: ''
  }

  _handleSubmit(e) {
    e.preventDefault();
    return false;
  }

  _handleCodeFocus(evt) {
    evt.target.select();
  }

  _handleEncryptMessageChange(evt) {
    this.setState({
      encryptMessage: evt.target.value
    }, () => this.encryptMessage());
  }

  _handleDecryptMessageChange(evt) {
    this.setState({
      decryptMessage: evt.target.value
    }, () => this.decryptMessage());
  }

  _handleEncryptPasswordChange(evt) {
    console.log('test');
    this.setState({
      encryptPassword: evt.target.value
    }, () => this.encryptMessage());
  }

  _handleDecryptPasswordChange(evt) {
    this.setState({
      decryptPassword: evt.target.value
    }, () => this.decryptMessage());
  }

  decryptMessage() {
    let decryptMessage = this.state.decryptMessage;
    try {
      let unarmored = message.readArmored(decryptMessage);
      decrypt({
        message: unarmored,
        password: this.state.decryptPassword
      }).then((plaintext) => {
        this.setState({
          decryptError: '',
          decryptedMessage: plaintext.data
        });
      });
    } catch (e) {
      this.setState({
        decryptError: e.toString()
      });
    }
  }

  encryptMessage() {
    let encryptMessage = this.state.encryptMessage;

    encrypt({
      data: encryptMessage,
      passwords: [this.state.encryptPassword]
    }).then( (ciphertext) => {
      this.setState({
        encryptedMessage: ciphertext.data
      });
    });


  }

  render() {
    return (
      <div>
       <nav className="nav-extended">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">🔎 seekrit</a>


            <a href="#" data-activates="mobile-demo" class="hide-on-med-and-down button-collapse"><i class="material-icons"></i></a>
            <ul className="tabs tabs-transparent">
              <li className="tab"><a href="#encrypt">Encrypt</a></li>
              <li className="tab"><a href="#decrypt">Decrypt</a></li>
            </ul>
          </div>
        </nav>
        <div id="encrypt" className="col s12">
          <br/>

          <div className="row">
            <form className="col s12" onSubmit={this._handleSubmit.bind(this)}>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="" id="encryptpassword" type="password"
                    className="validate" value={this.state.encryptPassword}
                    onChange={this._handleEncryptPasswordChange.bind(this)}/>
                  <label htmlFor="encryptpassword">Password</label>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="encryptmessage" value={this.state.encryptMessage}
                    className="materialize-textarea" onChange=
                    {this._handleEncryptMessageChange.bind(this)}>
        </textarea> <label htmlFor="encryptmessage">Message</label>
                  </div>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col s12">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">Encrypted Message</span>
                    <textarea className="like-code" onFocus={this._handleCodeFocus.bind(this)} value={this.state.encryptedMessage}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="decrypt" className="col s12">
          <br/>

          <div className="row">
            <form className="col s12" onSubmit={this._handleSubmit.bind(this)}>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="" id="decryptpassword" type="password"
                  className="validate" value={this.state.decryptPassword}
                  onChange={this._handleDecryptPasswordChange.bind(this)}/>
                  <label htmlFor="decryptpassword">Password</label>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="decryptmessage" value={this.state.decryptMessage}
                    className="materialize-textarea" onChange={this._handleDecryptMessageChange.bind(this)}>
        </textarea> <label htmlFor="decryptmessage">Encrypted Message</label>
                  </div>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col s12">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">Decrypted Message</span>
                    <p className="pink-text">
                      {this.state.decryptError}
                    </p>
                    <p className="flowText">{this.state.decryptedMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>
        </div>

    );
  }
}
