'use client'

import Link from "next/link";
import React, { Component} from 'react';
import Image from 'next/image';

class login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        logo_xl: '/images/logo-xl.png',
        logo: '/images/logo.png'
      };
      }
      render() {
        const { logo, logo_xl} = this.state;
        return (
            <div>
            <div className='justify-center items-center'>
                Hola
            </div>
            <hr />
            <hr />
            <ul>
            <li>
                    <Link href="/games/addition"
                        className=" text-slate-300 hover:text-slate-200"
                    >Addition</Link>
                </li>
                
                <li>
                    <Link href="/games/substraction"
                        className=" text-slate-300 hover:text-slate-200"
                    >sus
                    </Link>
                </li>
            </ul>
            </div>
            )
        };
        }
        export default login;        