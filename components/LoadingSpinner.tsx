const LoadingSpinner = () => {
    return (
        <div role="status" className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-opacity-80">
            <div className="animate-spin h-10 w-10 border-4 border-t-4 border-[#000] rounded-full"></div>
        </div>
    );
};

export default LoadingSpinner;
