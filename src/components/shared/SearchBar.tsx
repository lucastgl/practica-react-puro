type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }: Props) => {
    return (
        <input
            className='bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default SearchBar