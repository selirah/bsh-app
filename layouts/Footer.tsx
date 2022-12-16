export const Footer = () => {
  return (
    <footer className="text-center font-lato text-pSmall mt-12 flex justify-center">
      <div className="text-light-text dark:text-dark-text text-center">
        © {new Date().getFullYear()} Copyright:{' '}
        <a
          className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary common-transition"
          href="https://pces.mk"
          target="_blank"
        >
          PCES
        </a>
      </div>
    </footer>
  )
}
