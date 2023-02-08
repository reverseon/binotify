import * as React from "react"
import {
  ChakraProvider
} from "@chakra-ui/react"
import { Main } from "./page/Home"
import customTheme from "./config/theme"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./page/Login"
import Register from "./page/Register"
import Four04 from "./page/404"
import { useSelector } from "react-redux"
import AdmitSub from "./page/AdmitSub"
import AddSong from "./page/AddSong"
import SongList from "./page/SongList"
import SongDetails from "./page/SongDetails"
import Navbar from "./page/Navbar"


const App = () => {
  // get logged store
  const isLogin = useSelector((state: any) => state.session.isLogin)
  const isAdmin = useSelector((state: any) => state.session.user.isadmin)
  return (
    <ChakraProvider theme={customTheme}>
      <Routes>
        <Route path="/"
          element={
            isLogin ? 
              isAdmin ? (<><Navbar /><AdmitSub /></>): (<><Navbar /><SongList /></>)
            : <Navigate to="/login" />
          }
        />  
        <Route path="/login" element={
          isLogin ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/register" element={
          isLogin ? <Navigate to="/" /> : <Register />
        } />
        <Route path="/addsong" element={
          isLogin ? (<><Navbar /><AddSong /></>) : <Navigate to="/login" />
        } />
        <Route path="/song/:song_id" element={
          isLogin ? ((<><Navbar /><SongDetails /></>)) : <Navigate to="/login" />
        } />
        <Route path="*" element={
          isLogin ? <Four04 /> : <Navigate to="/login" />
        } />
      </Routes>
    </ChakraProvider>
  )
}

export {
  App
}
