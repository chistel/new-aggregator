import SectionContainer from './SectionContainer'
import Footer from './Footer'
import {ReactNode} from 'react'
import Header from './Header'

interface ILayoutWrapperProps {
   children: ReactNode
}


const LayoutWrapper = ({children}: ILayoutWrapperProps) => {
   return (
      <SectionContainer>
         <div className={`flex h-screen flex-col justify-between font-sans`}>
            <Header/>
            <main className="mb-auto">{children}</main>
            <Footer/>
         </div>
      </SectionContainer>
   )
}

export default LayoutWrapper
