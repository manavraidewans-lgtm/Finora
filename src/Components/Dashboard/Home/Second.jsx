export default function Second() {
    return (
        <div className="
            flex
            min-h-screen
            w-full
            flex-col
            gap-3
            p-4
            pl-8
            md:grid
            md:grid-cols-[65%_30%]
            md:gap-4
        ">

            {/* ================= CARDS ================= */}

            <div className="
                flex
                h-[65vh]
                w-full
                items-center
                justify-center
                bg-purple-300

                md:h-[25vh]
            ">
                <h1>Cards</h1>
            </div>


            {/* ================= QUICK ACTIONS ================= */}

            <div className="
                flex
                h-[25vh]
                w-full
                items-center
                justify-center
                bg-purple-100

                md:h-[25vh]
            ">
                <h1>Quick Actions</h1>
            </div>


            {/* ================= SECOND LINE ================= */}

            <div className="
                flex
                w-full
                flex-col
                gap-4

                md:col-span-2
                md:flex-row
            ">

                {/* ================= PIE CHART ================= */}

                <div className="
                    flex
                    h-[35vh]
                    w-full
                    items-center
                    justify-center
                    bg-blue-200

                    md:w-1/2
                ">
                    <h1>Pie Chart</h1>
                </div>


                {/* ================= BAR GRAPH ================= */}

                <div className="
                    flex
                    h-[75vh]
                    w-full
                    items-center
                    justify-center
                    bg-pink-200

                    md:h-[35vh]
                    md:w-1/2
                ">
                    <h1>Bar Graph</h1>
                </div>

            </div>


            {/* ================= RECENT ================= */}

            <div className="
                flex
                h-[35vh]
                w-full
                items-center
                justify-center
                bg-blue-200

                md:h-[30vh]
            ">
                <h1>Recent</h1>
            </div>


            {/* ================= GOALS ================= */}

            <div className="
                flex
                h-[30vh]
                w-full
                items-center
                justify-center
                bg-red-700

                md:h-[30vh]
            ">
                <h1>Goals</h1>
            </div>

        </div>
    );
}