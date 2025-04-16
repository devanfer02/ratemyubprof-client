export default function Footer() {
  return (
    <footer className="bg-ub-primary text-white py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} RateMyUbProf. All rights reserved.
      </p>
      <p>Created with ❤️ by <span className="font-bold">Anak UB</span> yang tercinta</p>
    </footer>

  )
}