import { Button } from '@/components/ui/button';
import { TextAlignJustify, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';

const AdminHeader = ({ setOpen }) => {

    const dispatch = useDispatch();

    return (
        <header className='flex items-center justify-between px-4 py-3 bg-background border-b '>
            <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
                <TextAlignJustify className='w-5 h-5' />
                <span className='sr-only'>Toggle Menu</span>
            </Button>
            <div className='flex flex-1 justify-end'>
                <Button
                    className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
                    onClick={() => dispatch(logoutUser())}
                >
                <LogOut />
                Logout
            </Button>
        </div>
        </header >
    )
}

export default AdminHeader;