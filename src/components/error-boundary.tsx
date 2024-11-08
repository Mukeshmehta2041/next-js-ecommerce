export const ErrorBoundary = ({ error }: {
    error: {
        message: string;
    }
}) => {
    return (
        <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Oops! Something went wrong.</h2>
            <p>{error.message}</p>
        </div>
    )
}