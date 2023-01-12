import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { NavBar } from '../components/NavBar';

export function LayoutMain() {
    return (
        <>
            <div className="min-h-full">
                
                {/* ------------ */}
                <NavBar/>

                {/* ------------ */}
                <Header/>
                
                {/* ------------ */}
                <Main/>
            </div>
        </>
    );
}