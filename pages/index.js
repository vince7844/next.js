import React, {useEffect} from 'react';
import { Layout } from '../components/layout';
import axios from 'axios';
import Link from "next/link";
import Head from "next/head"

const Home = ({data}) => {
  const styles = {
    padding: 10,
    margin: 10,
    borderBottom: "1px solid #DDD"
  }

  return (
    <> 
      <Head>
        <title>Liste des régions</title>
      </Head>
      <Layout>
        <div className="container-fluid">
          {/* <h1>Cette page utilise getServerSideProps</h1>
          <img src="/images/montagne.jpg" /> */}
          {
            data.map(region => (
                <div style={styles} key={region.code}>
                  <Link href={"/region/[code]"} as={`/region/${region.code}`} passHref>
                  <h3>{region.nom}</h3>
                  </Link>
                  <p>{region.code}</p>
                </div>
            ))
          }
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { data } = await axios.get(`${process.env.API_GEO}/regions`)
  return {
    props: {
      data
    }
  };
}

export default Home;