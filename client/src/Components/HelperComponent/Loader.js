const Loader = () => {
    const color = "#3498db"
    const SIZE = 60
    const BORDER_WIDTH = SIZE * 0.1 // 10% of the size

    const loaderStyle = {
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        border: `${BORDER_WIDTH}px solid #f3f3f3`,
        borderTop: `${BORDER_WIDTH}px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    }
    return (
        <div className="loader">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <style>
                    {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
                </style>
                <div style={loaderStyle}></div>
            </div>
        </div>
    )
}
export default Loader