import { MenuIcon, ChevronRight, ChevronLeft } from "lucide-react"
import RecurringDataPicker from "../../components/RecurringDatePicker"

export default function Calendar() {

    return (
        <>
            <header className="flex">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 mx-2 my-4">
                        <MenuIcon className="w-6 h-6"/>

                        <h1 className="tracking-wide text-2xl mr-4">Calendar</h1>
                        
                        <div className="flex items-center gap-4">

                            <button className="px-6 py-2 border rounded-full font-semibold mr-2">Today</button>

                            <button>
                                <ChevronLeft/>
                            </button>

                            <button>
                                <ChevronRight/>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="flex">
                    <RecurringDataPicker/>
                </div>
            </main>
        </>
    );
}