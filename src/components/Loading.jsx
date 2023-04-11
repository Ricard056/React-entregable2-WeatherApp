import React from 'react'
import '../App.css';

const Loading = ({ backgroundName, appHasLocation, loading }) => {
  // console.log('Empezare a renderizar Loading'); // 

  const loadingStyle = {
    backgroundImage:
      backgroundName
        ? `url('/backgrounds/${backgroundName}.jpg')`
        : `url('/backgrounds/000.jpg')`,
  };

  return (
    <div className="loading backgroundImage" style={loadingStyle}>
      <div className='loadingContainer'>
        {
          loading ? (     //Agregue useState related to loading, pues si hacia F5 se veia gif 404
            <img src="/gif/loading.gif" alt="Loading" />
          ) : (
            appHasLocation
              ? <img src="/gif/loading.gif" alt="Loading" />
              : (
                <>
                  <img src="/gif/if_404.gif" alt="Image_if_user_doesnt_share_location" />
                  <p className='textIfNotShareGeolocation'>Respetamos su decision de no compartir su información.</p>
                </>
              )
          )
        }
      </div>
    </div>
  );
};

export default Loading;