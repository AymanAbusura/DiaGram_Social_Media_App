import "@/LightMode.css";

const LightMode = () => {
    const setLightMode = () => {
        document.querySelector("body")?.setAttribute('data-theme','light');
        localStorage.setItem('selectedTheme','light');
    }
    const setDarkMode = () => {
        document.querySelector("body")?.setAttribute('data-theme','dark');
        localStorage.setItem('selectedTheme','dark');
    }
    const selectedTheme = localStorage.getItem('selectedTheme');
    if(selectedTheme === 'light'){
        setLightMode()
    }
    const toogleTheme = (e) => {
        if(e.target.checked) setLightMode();
        else setDarkMode()
    }
    return (
        <div className='light_mode'>
            <input className='light_mode_input' type='checkbox' id='darkmode-toggle' onChange={toogleTheme} defaultChecked={selectedTheme === "light"} />
            <label className='light_mode_label' htmlFor='darkmode-toggle'>
                {/* <img src={'./assets/icons/Moon.svg'} width={16} height={16} /> */}
                {/* <img src={'./assets/icons/Sun.svg'} width={16} height={16} style={{display:'absolute'}}/> */}
            </label>
        </div>
    );
};

export default LightMode;
