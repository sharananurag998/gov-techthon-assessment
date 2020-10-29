import React from 'react'
import { Layout, Menu, Breadcrumb, Space } from 'antd';
import { Image } from 'antd';
import './header.css'

const { Header, Content, Footer } = Layout;

export default function HeaderLogos() {
    return (
        <div className="HeaderLogos">
          <img src='logos/ieee_blue-0.jpg' />
          <img src='logos/oracle.JPG' />
          <img src='logos/nic.jpg' />
          <img src='logos/ieee_cs.png' />
        </div>
    )
}