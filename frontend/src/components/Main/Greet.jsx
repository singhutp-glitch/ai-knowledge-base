import React from 'react'
import { assets } from '../../assets/assets'
import './Main.css'

const Greet = ({user}) => {
  return (<><div className="greet">
                  <p><span>Hello, {user.name.split(' ')[0]}</span></p>
                  <p>How can i help you ?</p>
              </div>
              <div className="cards">
                  <div className="card">
                      <p>Suggest beautiful places to see on upcoming road trip</p>
                      <img src={assets.compass_icon} alt="" />
                  </div>
                  <div className="card">
                      <p>Explain this concept of urban planning</p>
                      <img src={assets.bulb_icon} alt="" />
                  </div>
                  <div className="card">
                      <p>Brainstorm some ideas for upcoming tean project</p>
                      <img src={assets.message_icon} alt="" />
                  </div>
                  <div className="card">
                      <p>Improve the readability of the following code</p>
                      <img src={assets.code_icon} alt="" />
                  </div>
              </div></>)
}

export default Greet