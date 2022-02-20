import Notiflix from 'notiflix';

export const options = Notiflix.Notify.init({
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  borderRadius: '5px',
  clickToClose: true,
  fontSize: '18px',
  timeout: 3000,

  warning: {
    background: '#ff704e',
  },
});
