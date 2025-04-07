import { create } from "zustand";
import { ProductsEntity } from "@/app/types";

interface State{
    id:string;
    name:string;
    items?: ProductsEntity |null
}

interface Action{
    setSelectedItem: (item: State) => void;
    clearSelectedItem: () => void;
}

const INITIAL_STATE : State = {
    id: "",
    name: "",
    items: null
}

const useAdminStore = create<State & Action>()(
    (set) =>({
        id: INITIAL_STATE.id,
        name: INITIAL_STATE.name,
        items: INITIAL_STATE.items,
        setSelectedItem: (item: State) => {
            set(() => ({
                id: item.id,
                name: item.name,
                items: item.items
            }))
        },
        clearSelectedItem: () => {
            set(() => ({
                id: "",
                name: "",
                items: null
            }))
        }

    })
);
export default useAdminStore;