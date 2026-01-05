export const registerFormControls = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter your user name",
        componentType: "input",
        type: "text",
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password",
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Re-enter your password",
        componentType: "input",
        type: "password"
    }
];

export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password",
    },
]

export const addProductFormElements = [
    {
        name: "title",
        label: "Title",
        placeholder: "Enter product title",
        componentType: "input",
        type: "text",
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Enter product description",
        componentType: "textarea",
    },
    {
        name: "category",
        label: "Category",
        options: [
            { id: 'men', label: "Men" },
            { id: 'women', label: "Women" },
            { id: 'kids', label: "Kids" },
            { id: 'accessories', label: "Accessories" },
            { id: 'footwear', label: "Footwear" },
        ],
        componentType: "select",
    },
    {
        name: "brand",
        label: "Brand",
        options: [
            { id: 'nike', label: "Nike" },
            { id: 'adidas', label: "Adidas" },
            { id: 'puma', label: "Puma" },
            { id: 'levi', label: "Levi's" },
            { id: 'underarmour', label: "Under Armour" },
            { id: 'newbalance', label: "New Balance" },
            { id: 'h&m', label: "H&M" },
        ],
        componentType: "select",
    },
    {
        name: "price",
        label: "Price",
        placeholder: "Enter product price",
        componentType: "input",
        type: "number",
    },
    {
        name: "salePrice",
        label: "Sale Price",
        placeholder: "Enter product sale price(optional)",
        componentType: "input",
        type: "number",
    },
    {
        name: "totalStock",
        label: "Total Stock",
        placeholder: "Enter total stock quantity",
        componentType: "input",
        type: "number",
    }
];
