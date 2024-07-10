import SpinningBanner from '../spinningBanner/SpinningBaner'

function LoadingPage() {
    return (
        <div>
            <div className="flex items-center justify-center mt-[25rem]">
                <h2 className="font-bebas text-white text-2xl">
                    Please wait, we are loading your content
                </h2>
            </div>
            <div className="mt-[2rem]">
                <SpinningBanner />
            </div>
        </div>
    )
}

export default LoadingPage
