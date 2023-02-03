import Header from '../Header'

import {
  HomeBgContainer,
  HomeCardContainer,
  Heading,
  HomeCardImage,
} from './styledComponents'

const Home = () => (
  <>
    <HomeBgContainer>
      <Header />
      <HomeCardContainer>
        <Heading>Your Flexibility, Our Excellence</Heading>
        <HomeCardImage
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </HomeCardContainer>
    </HomeBgContainer>
  </>
)

export default Home
