import Box3 from "./Box3"

function BoxStack2() {
    return (
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">

            <Box3
                Icon="ri-wallet-2-line"
                Tittle="Track Your Spending"
                Description="See your expenses clearly and understand where your money goes every month."
            />

            <Box3
                Icon="ri-bar-chart-box-line"
                Tittle="Plan with confidence"
                Description="Create budgets that fit your lifestyle and keep your spending on track."
            />

            <Box3
                Icon="ri-target-fill"
                Tittle="Reach Your Goals"
                Description="Whether you're saving for a trip, a purchase, or your future, keep your goals within spending."
            />

        </div>
    )
}

export default BoxStack2