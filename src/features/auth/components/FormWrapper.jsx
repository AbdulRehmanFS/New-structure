/* eslint-disable react/prop-types */
import logo from "@assets/images/logo.png";
import BackgroundImage from "@assets/images/authBackground.png";

export default function FormWrapper({ children }) {
  return (
    <div 
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'contain',
        boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[390px] min-h-[380px]">
        <div className="mb-6 overflow-hidden flex justify-center items-center">
          <img src={logo} alt="" height="155px" width="auto" />
        </div>
        {children}
      </div>
    </div>
  );
}

