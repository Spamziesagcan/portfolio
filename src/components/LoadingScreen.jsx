function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#121212] text-white">
      <div className="flex flex-col items-center gap-5">
        <div className="animate-spin">
          <svg
            aria-label="Spotify loading"
            role="img"
            viewBox="0 0 24 24"
            className="h-20 w-20 fill-white"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12S18.628 0 12 0zm5.503 17.298a.747.747 0 01-1.028.246c-2.815-1.72-6.358-2.11-10.53-1.16a.748.748 0 11-.332-1.458c4.566-1.04 8.482-.597 11.643 1.333.35.214.46.675.247 1.04zm1.468-3.27a.936.936 0 01-1.287.309c-3.222-1.98-8.134-2.553-11.946-1.392a.937.937 0 11-.546-1.792c4.357-1.326 9.776-.684 13.473 1.588a.936.936 0 01.306 1.287zm.126-3.406C15.233 8.33 8.86 8.12 5.173 9.246a1.123 1.123 0 11-.658-2.147c4.23-1.294 11.262-1.043 15.757 1.626a1.122 1.122 0 11-1.175 1.897z" />
          </svg>
        </div>
        <p className="text-sm font-medium tracking-[0.14em] text-[#B3B3B3] uppercase">
          Loading portfolio
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen
