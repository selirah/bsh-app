import { useContext } from 'react'
import { ColorContext } from 'contexts'
import { baseThemeProd, baseThemeUat } from 'themes/base'

export const IForgottenPassword = () => {
  const { color } = useContext(ColorContext)
  const colorPrimary =
    color === 'uat' ? baseThemeUat['--theme-primary'] : baseThemeProd['--theme-primary']

  return (
    <svg
      width="630"
      height="409"
      viewBox="0 0 630 409"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_197_2941)">
        <path
          d="M614.368 249.791H592.24C591.768 249.792 591.301 249.686 590.875 249.48C590.449 249.275 590.075 248.976 589.781 248.606C589.491 248.245 589.286 247.823 589.182 247.372C589.078 246.921 589.078 246.452 589.181 246C591.259 236.827 591.159 227.295 588.889 218.167C588.713 217.469 588.785 216.732 589.093 216.081C589.4 215.43 589.924 214.906 590.574 214.598C599.817 210.272 608.304 210.384 615.8 214.932C616.193 215.167 616.53 215.485 616.787 215.864C617.045 216.242 617.216 216.673 617.291 217.124C618.88 227.048 618.94 237.155 617.471 247.097C617.367 247.845 616.995 248.531 616.424 249.026C615.854 249.521 615.123 249.793 614.368 249.791Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M614.031 235.295H597.112C596.692 235.294 596.289 235.126 595.992 234.829C595.695 234.531 595.528 234.128 595.528 233.708C595.528 233.287 595.695 232.884 595.992 232.587C596.289 232.289 596.692 232.121 597.112 232.121H614.031C614.451 232.121 614.854 232.289 615.151 232.587C615.448 232.884 615.615 233.287 615.615 233.708C615.615 234.128 615.448 234.531 615.151 234.829C614.854 235.126 614.451 235.294 614.031 235.295Z"
          fill="#FEFEFE"
        />
        <path
          d="M614.031 229.729H597.112C596.692 229.728 596.289 229.56 595.992 229.263C595.695 228.965 595.528 228.562 595.528 228.142C595.528 227.721 595.695 227.318 595.992 227.021C596.289 226.723 596.692 226.556 597.112 226.555H614.031C614.451 226.556 614.854 226.723 615.151 227.021C615.448 227.318 615.615 227.721 615.615 228.142C615.615 228.562 615.448 228.965 615.151 229.263C614.854 229.56 614.451 229.728 614.031 229.729Z"
          fill="#FEFEFE"
        />
        <path
          d="M171.256 247.573C236.194 247.573 288.837 194.931 288.837 129.993C288.837 65.0547 236.194 12.4121 171.256 12.4121C106.318 12.4121 53.6758 65.0547 53.6758 129.993C53.6758 194.931 106.318 247.573 171.256 247.573Z"
          fill="#F2F2F2"
        />
        <path
          d="M307.621 244.094C319.917 244.094 329.885 234.127 329.885 221.831C329.885 209.535 319.917 199.567 307.621 199.567C295.325 199.567 285.357 209.535 285.357 221.831C285.357 234.127 295.325 244.094 307.621 244.094Z"
          fill="#F2F2F2"
        />
        <path
          d="M419.636 294.187C424.632 294.187 428.681 290.138 428.681 285.143C428.681 280.148 424.632 276.098 419.636 276.098C414.641 276.098 410.592 280.148 410.592 285.143C410.592 290.138 414.641 294.187 419.636 294.187Z"
          fill="#F2F2F2"
        />
        <path
          d="M489.47 320.716C485.655 291.57 467.394 262.946 439.514 253.631C450.677 283.585 450.886 316.521 440.103 346.613C435.902 358.203 430.023 370.657 434.119 382.285C436.667 389.52 442.823 395.028 449.686 398.453C456.55 401.879 464.153 403.483 471.661 405.056L473.145 406.266C484.875 379.314 493.284 349.863 489.47 320.716Z"
          fill="#F2F2F2"
        />
        <path
          d="M439.242 254.185C455.559 272.233 465.773 294.964 468.436 319.148C468.975 324.333 469.07 329.639 467.969 334.76C466.857 339.743 464.431 344.338 460.943 348.066C457.76 351.608 454.095 354.862 451.829 359.116C449.44 363.6 449.38 368.677 451.065 373.413C453.127 379.207 457.148 383.914 461.24 388.382C465.783 393.341 470.581 398.421 472.541 405.023C472.778 405.822 474.005 405.407 473.768 404.609C470.358 393.123 459.146 386.659 453.753 376.329C451.236 371.509 450.157 365.901 452.455 360.781C454.464 356.304 458.241 352.945 461.494 349.386C464.91 345.65 467.522 341.558 468.849 336.632C470.206 331.592 470.318 326.271 469.914 321.095C468.911 309.366 466.069 297.867 461.494 287.02C456.341 274.611 449.103 263.176 440.093 253.208C439.535 252.591 438.688 253.572 439.242 254.185H439.242Z"
          fill="#FEFEFE"
        />
        <path
          d="M468.038 311.31C472.035 310.313 475.547 307.927 477.947 304.579C480.347 301.231 481.479 297.138 481.141 293.033C481.07 292.202 479.776 292.274 479.847 293.106C480.169 296.928 479.115 300.74 476.873 303.853C474.632 306.966 471.351 309.176 467.624 310.083C466.814 310.281 467.233 311.507 468.038 311.31Z"
          fill="#FEFEFE"
        />
        <path
          d="M462.794 346.482C455.536 342.212 450.154 335.362 447.722 327.3C447.482 326.501 446.255 326.916 446.495 327.714C449.041 336.099 454.656 343.215 462.219 347.643C462.94 348.065 463.511 346.902 462.794 346.482Z"
          fill="#FEFEFE"
        />
        <path
          d="M455.147 275.846C453.681 276.554 452.062 276.887 450.435 276.815C448.809 276.743 447.226 276.268 445.828 275.433C445.113 275.002 444.542 276.166 445.253 276.594C446.801 277.509 448.55 278.032 450.347 278.115C452.144 278.199 453.934 277.841 455.561 277.074C455.721 277.014 455.851 276.896 455.927 276.744C456.002 276.591 456.017 276.416 455.968 276.253C455.912 276.091 455.795 275.957 455.641 275.881C455.487 275.805 455.31 275.792 455.147 275.846V275.846Z"
          fill="#FEFEFE"
        />
        <path
          d="M355.053 306.275C355.492 306.556 355.931 306.838 356.371 307.13C362.254 310.945 367.818 315.232 373.007 319.948C373.414 320.306 373.821 320.675 374.217 321.044C386.597 332.54 396.736 346.233 404.118 361.43C407.049 367.48 409.517 373.744 411.498 380.168C414.234 389.04 416.495 398.877 421.844 406.114C422.394 406.875 422.99 407.602 423.629 408.289L471.552 407.983C471.661 407.927 471.77 407.883 471.879 407.827L473.793 407.903C473.714 407.564 473.625 407.215 473.546 406.876C473.501 406.68 473.445 406.483 473.4 406.287C473.367 406.156 473.333 406.025 473.31 405.905C473.299 405.861 473.288 405.818 473.277 405.785C473.254 405.665 473.22 405.555 473.198 405.446C472.704 403.492 472.196 401.538 471.673 399.584C471.673 399.573 471.673 399.573 471.662 399.563C467.641 384.685 462.343 370.012 454.986 356.61C454.765 356.207 454.544 355.793 454.3 355.39C450.951 349.367 447.114 343.629 442.83 338.231C440.474 335.283 437.97 332.456 435.329 329.761C428.49 322.811 420.601 316.98 411.951 312.482C394.704 303.517 374.783 300.167 356.449 305.828C355.98 305.973 355.522 306.118 355.053 306.275Z"
          fill="#F2F2F2"
        />
        <path
          d="M355.164 306.882C379.059 311.469 400.9 323.468 417.586 341.175C421.138 344.99 424.409 349.169 426.613 353.921C428.725 358.569 429.554 363.698 429.014 368.775C428.606 373.519 427.638 378.325 428.39 383.085C429.183 388.103 432.191 392.194 436.388 394.96C441.523 398.345 447.567 399.683 453.524 400.786C460.138 402.011 467.027 403.178 472.566 407.269C473.238 407.765 473.967 406.694 473.297 406.199C463.659 399.082 450.815 400.671 440.29 395.67C435.378 393.337 431.14 389.509 429.892 384.038C428.801 379.254 429.794 374.298 430.249 369.498C430.727 364.458 430.349 359.618 428.442 354.886C426.492 350.045 423.378 345.729 419.939 341.839C412.076 333.078 402.884 325.607 392.7 319.702C381.115 312.897 368.451 308.124 355.256 305.589C354.439 305.433 354.353 306.726 355.164 306.882Z"
          fill="#FEFEFE"
        />
        <path
          d="M412.55 335.157C415.14 331.954 416.508 327.935 416.409 323.816C416.31 319.698 414.75 315.749 412.008 312.675C411.451 312.055 410.461 312.891 411.018 313.512C413.577 316.37 415.03 320.049 415.115 323.884C415.199 327.719 413.91 331.458 411.48 334.426C410.952 335.072 412.025 335.799 412.55 335.157Z"
          fill="#FEFEFE"
        />
        <path
          d="M429.539 366.397C421.172 367.357 412.752 365.128 405.956 360.155C405.283 359.661 404.553 360.732 405.225 361.224C412.307 366.386 421.074 368.688 429.778 367.67C430.608 367.573 430.364 366.3 429.539 366.397Z"
          fill="#FEFEFE"
        />
        <path
          d="M380.905 314.602C380.161 316.05 379.068 317.291 377.726 318.212C376.384 319.134 374.834 319.708 373.215 319.883C372.385 319.97 372.63 321.242 373.455 321.156C375.242 320.955 376.954 320.319 378.439 319.304C379.924 318.289 381.138 316.925 381.975 315.333C382.066 315.189 382.099 315.016 382.068 314.849C382.036 314.682 381.942 314.533 381.805 314.432C381.663 314.336 381.489 314.3 381.32 314.332C381.152 314.364 381.002 314.461 380.905 314.602H380.905Z"
          fill="#FEFEFE"
        />
        <path
          d="M584.904 206.809L578.423 144.078L576.713 118.26L594.853 114.98C594.853 114.98 597.569 132.729 599.945 143.145C602.29 153.423 596.821 205.432 596.676 206.804C598.008 207.995 598.948 209.562 599.369 211.299C599.791 213.036 599.676 214.859 599.039 216.529C598.402 218.199 597.273 219.636 595.801 220.65C594.329 221.664 592.585 222.207 590.798 222.208C589.011 222.209 587.265 221.667 585.793 220.654C584.32 219.642 583.19 218.206 582.551 216.537C581.912 214.868 581.795 213.044 582.215 211.307C582.636 209.57 583.573 208.002 584.904 206.809Z"
          fill="#FFB8B8"
        />
        <path
          d="M510.779 399.42H501.55L497.16 363.826L510.78 363.826L510.779 399.42Z"
          fill="#FFB6B6"
        />
        <path
          d="M513.131 408.365L483.376 408.364V407.988C483.376 404.916 484.596 401.971 486.768 399.799C488.94 397.627 491.886 396.407 494.958 396.407H494.958L500.393 392.283L510.534 396.407L513.132 396.407L513.131 408.365Z"
          fill="#2F2E41"
        />
        <path
          d="M592.108 399.42H582.88L578.49 363.826L592.11 363.826L592.108 399.42Z"
          fill="#FFB6B6"
        />
        <path
          d="M594.461 408.365L564.706 408.364V407.988C564.706 404.916 565.927 401.971 568.098 399.799C570.27 397.627 573.216 396.407 576.288 396.407H576.288L581.724 392.283L591.864 396.407L594.462 396.407L594.461 408.365Z"
          fill="#2F2E41"
        />
        <path
          d="M578.074 208.918L585.835 282.654C585.835 282.654 596.168 356.484 594.227 366.671C592.287 376.858 594.713 378.313 594.713 378.313L577.007 377.052C577.007 377.052 577.492 370.746 574.582 367.835C571.671 364.925 573.126 356.193 573.126 356.193L538.781 236.084L517.921 299.147C517.921 299.147 514.526 368.517 514.041 369.487C513.556 370.457 512.1 383.555 512.1 383.555H494.151C494.151 383.555 496.577 375.793 493.181 373.368C489.786 370.942 486.875 372.882 489.786 368.516C492.696 364.151 493.666 358.814 492.696 356.389C491.726 353.964 491.726 344.261 491.726 344.261C491.726 344.261 493.181 213.284 501.428 208.918C509.675 204.553 578.074 208.918 578.074 208.918Z"
          fill="#2F2E41"
        />
        <path
          d="M541.316 59.6234C551.859 59.6234 560.406 51.0764 560.406 40.5331C560.406 29.9899 551.859 21.4429 541.316 21.4429C530.773 21.4429 522.226 29.9899 522.226 40.5331C522.226 51.0764 530.773 59.6234 541.316 59.6234Z"
          fill="#FFB8B8"
        />
        <path
          d="M597.911 124.988L579.135 131.722L573.417 133.771L569.243 80.458L583.568 88.0552C583.592 88.0729 583.613 88.0942 583.631 88.1182C586.112 90.858 588.188 93.9385 589.797 97.2663C597.652 113.236 597.911 124.988 597.911 124.988Z"
          fill="#3F3D56"
        />
        <path
          d="M468.57 202.305C468.57 202.305 487.652 143.015 487.986 142.304C490.485 123.323 497.674 114.951 498.752 115.86L517.306 122.288C517.306 122.288 511.787 139.764 508.05 150.145C504.48 160.064 480.027 205.86 479.34 207.056C480.078 208.684 480.303 210.497 479.988 212.256C479.672 214.015 478.83 215.637 477.572 216.907C476.315 218.177 474.701 219.035 472.946 219.368C471.19 219.701 469.374 219.493 467.739 218.772C466.104 218.051 464.726 216.85 463.789 215.329C462.851 213.808 462.397 212.037 462.487 210.253C462.577 208.468 463.207 206.752 464.293 205.333C465.379 203.914 466.87 202.858 468.57 202.305H468.57Z"
          fill="#FFB8B8"
        />
        <path
          d="M526.218 83.8918C526.218 83.8918 510.154 76.0189 503.923 91.4817C499.843 101.91 497.911 106.458 495.187 117.32C495.187 117.32 511.561 119.776 516.811 129.03L526.218 83.8918Z"
          fill="#3F3D56"
        />
        <path
          d="M584.671 216.955C547.7 224.59 498.706 211.464 498.706 211.464L511.776 154.81L507.129 95.5203C506.562 88.2699 510.691 81.4734 517.116 79.0651L525.987 75.7425L533.319 65.2451L554.263 65.9323L562.636 76.9529L569.243 80.4584L583.567 88.0556L583.63 88.087V88.1185L579.135 131.722L576.424 158.013C576.424 158.013 584.658 187.582 582.968 191.503C581.279 195.418 582.748 193.527 583.158 195.62C583.567 197.713 584.822 197.846 585.011 201.969C585.207 206.086 584.671 216.955 584.671 216.955Z"
          fill="#3F3D56"
        />
        <path
          d="M562.025 33.7351C560.516 32.2468 562.787 28.3067 562.358 26.2313C561.866 23.8519 559.244 23.7823 558.619 21.4344C557.946 18.9087 555.255 17.5337 552.767 16.7332C546.388 14.6923 539.583 14.3806 533.045 15.8299C530.151 16.5364 527.302 17.4141 524.512 18.4582C522.587 19.1359 524.444 17.2917 522.518 17.9694C521.789 18.1319 521.146 18.5587 520.713 19.1674C520.366 19.822 520.833 20.8688 521.562 20.7362C519.211 21.773 516.86 22.8097 514.509 23.8465C515.827 25.2276 517.146 26.6088 518.464 27.9901C516.59 27.4566 514.592 29.6914 515.331 31.4946C515.628 32.0639 516.059 32.5523 516.587 32.9178C517.115 33.2834 517.724 33.515 518.362 33.5929C520.479 34.0049 518.873 36.0203 521.03 35.981C523.187 35.9418 538.228 31.5202 539.277 33.4056C540.024 34.7481 539.942 36.5264 541.008 37.6325C542.372 39.0476 544.754 38.5301 546.49 37.6087C548.226 36.6875 549.987 35.4213 551.94 35.6422C553.979 35.8728 555.521 39.6408 556.023 41.6305C556.526 43.6202 556.208 45.7137 555.889 47.7408C555.469 50.403 551.266 53.0651 550.847 55.7272C555.511 57.0171 560.514 52.913 562.358 45.7759C562.175 41.2642 565.239 36.9065 562.025 33.7351Z"
          fill="#2F2E41"
        />
        <path
          d="M265.25 281.667C209.052 281.669 160.156 239.747 152.933 182.567L154.313 182.392C161.447 238.866 209.748 280.272 265.251 280.275C269.967 280.275 274.678 279.978 279.356 279.385C340.571 271.652 384.082 215.558 376.349 154.343L377.729 154.168C385.559 216.144 341.507 272.936 279.531 280.766C274.794 281.365 270.024 281.666 265.25 281.667Z"
          fill="#3F3D56"
        />
        <path
          d="M268.268 304.939H246.141C245.668 304.94 245.201 304.834 244.775 304.629C244.349 304.424 243.975 304.125 243.682 303.754C243.391 303.393 243.186 302.972 243.082 302.52C242.978 302.069 242.978 301.6 243.081 301.148C245.181 291.882 245.057 282.249 242.72 273.04C242.56 272.404 242.605 271.733 242.849 271.125C243.093 270.516 243.523 269.999 244.077 269.649C251.732 264.907 260.067 265.055 269.561 270.103C269.992 270.33 270.365 270.654 270.651 271.049C270.937 271.444 271.128 271.9 271.208 272.381C272.78 282.27 272.835 292.34 271.371 302.245C271.267 302.994 270.895 303.679 270.325 304.174C269.754 304.669 269.024 304.941 268.268 304.939Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M167.385 186.662H145.258C144.785 186.663 144.318 186.557 143.892 186.352C143.467 186.147 143.093 185.848 142.799 185.477C142.508 185.117 142.304 184.695 142.2 184.243C142.096 183.792 142.095 183.323 142.198 182.871C144.306 173.573 144.173 163.906 141.812 154.669C141.663 154.061 141.699 153.422 141.916 152.834C142.133 152.246 142.521 151.737 143.029 151.372C154.407 143.189 163.368 143.426 169.662 152.079C169.946 152.473 170.134 152.928 170.213 153.408C171.894 163.518 171.987 173.829 170.488 183.968C170.384 184.717 170.012 185.402 169.442 185.897C168.871 186.392 168.141 186.664 167.385 186.662Z"
          fill="#CCCCCC"
        />
        <path
          d="M257.929 284.171H250.317C249.897 284.17 249.494 284.003 249.197 283.705C248.9 283.408 248.733 283.004 248.733 282.584C248.733 282.164 248.9 281.761 249.197 281.463C249.494 281.166 249.897 280.998 250.317 280.997H257.929C258.35 280.997 258.754 281.164 259.051 281.462C259.349 281.76 259.516 282.163 259.516 282.584C259.516 283.005 259.349 283.409 259.051 283.706C258.754 284.004 258.35 284.171 257.929 284.171Z"
          fill="#FEFEFE"
        />
        <path
          d="M267.236 290.442H250.317C249.897 290.441 249.494 290.274 249.197 289.976C248.9 289.679 248.733 289.275 248.733 288.855C248.733 288.435 248.9 288.032 249.197 287.734C249.494 287.437 249.897 287.269 250.317 287.268H267.236C267.656 287.269 268.059 287.437 268.356 287.734C268.653 288.032 268.82 288.435 268.82 288.855C268.82 289.275 268.653 289.679 268.356 289.976C268.059 290.274 267.656 290.441 267.236 290.442Z"
          fill="#FEFEFE"
        />
        <path
          d="M160.525 164.504H152.913C152.493 164.503 152.09 164.335 151.793 164.038C151.496 163.74 151.329 163.337 151.329 162.917C151.329 162.496 151.496 162.093 151.793 161.796C152.09 161.498 152.493 161.33 152.913 161.33H160.525C160.945 161.33 161.348 161.498 161.645 161.796C161.942 162.093 162.108 162.496 162.108 162.917C162.108 163.337 161.942 163.74 161.645 164.038C161.348 164.335 160.945 164.503 160.525 164.504Z"
          fill="#FEFEFE"
        />
        <path
          d="M160.525 170.07H152.913C152.493 170.069 152.09 169.901 151.793 169.604C151.496 169.306 151.329 168.903 151.329 168.483C151.329 168.062 151.496 167.659 151.793 167.362C152.09 167.064 152.493 166.896 152.913 166.896H160.525C160.945 166.896 161.348 167.064 161.645 167.362C161.942 167.659 162.108 168.062 162.108 168.483C162.108 168.903 161.942 169.306 161.645 169.604C161.348 169.901 160.945 170.069 160.525 170.07Z"
          fill="#FEFEFE"
        />
        <path
          d="M160.525 175.636H152.913C152.493 175.635 152.09 175.467 151.793 175.17C151.496 174.872 151.329 174.469 151.329 174.048C151.329 173.628 151.496 173.225 151.793 172.927C152.09 172.63 152.493 172.462 152.913 172.461H160.525C160.945 172.462 161.348 172.63 161.645 172.927C161.942 173.225 162.108 173.628 162.108 174.048C162.108 174.469 161.942 174.872 161.645 175.17C161.348 175.467 160.945 175.635 160.525 175.636Z"
          fill="#FEFEFE"
        />
        <path
          d="M465.192 212.803H394.46C392.564 212.801 390.747 212.047 389.406 210.707C388.066 209.366 387.312 207.549 387.31 205.653V162.088C387.312 160.193 388.066 158.375 389.406 157.035C390.747 155.695 392.564 154.941 394.46 154.938H465.192C467.088 154.941 468.905 155.695 470.246 157.035C471.586 158.375 472.34 160.193 472.342 162.088V205.653C472.34 207.549 471.586 209.366 470.246 210.707C468.905 212.047 467.088 212.801 465.192 212.803Z"
          fill="#E6E6E6"
        />
        <path
          d="M437.088 207.192H399.431C397.656 207.19 395.953 206.484 394.698 205.229C393.443 203.973 392.736 202.271 392.734 200.496V167.246C392.736 165.471 393.443 163.769 394.698 162.514C395.953 161.258 397.656 160.552 399.431 160.55H460.22C461.995 160.552 463.697 161.258 464.952 162.514C466.208 163.769 466.914 165.471 466.916 167.246V177.365C466.907 185.273 463.761 192.854 458.17 198.446C452.578 204.038 444.996 207.183 437.088 207.192Z"
          fill="#FEFEFE"
        />
        <path
          d="M454.156 178.756H405.495C405.074 178.756 404.671 178.589 404.373 178.292C404.075 177.994 403.908 177.59 403.908 177.169C403.908 176.749 404.075 176.345 404.373 176.047C404.671 175.75 405.074 175.583 405.495 175.583H454.156C454.577 175.583 454.98 175.75 455.278 176.047C455.576 176.345 455.743 176.749 455.743 177.169C455.743 177.59 455.576 177.994 455.278 178.292C454.98 178.589 454.577 178.756 454.156 178.756Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M413.107 185.028H405.495C405.075 185.027 404.672 184.86 404.375 184.562C404.078 184.265 403.911 183.861 403.911 183.441C403.911 183.021 404.078 182.618 404.375 182.32C404.672 182.022 405.075 181.855 405.495 181.854H413.107C413.527 181.855 413.93 182.022 414.227 182.32C414.524 182.618 414.69 183.021 414.69 183.441C414.69 183.861 414.524 184.265 414.227 184.562C413.93 184.86 413.527 185.027 413.107 185.028Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M426.588 191.299H405.495C405.074 191.299 404.671 191.131 404.373 190.834C404.075 190.536 403.908 190.132 403.908 189.712C403.908 189.291 404.075 188.887 404.373 188.589C404.671 188.292 405.074 188.125 405.495 188.125H426.588C427.009 188.125 427.413 188.292 427.711 188.589C428.008 188.887 428.175 189.291 428.175 189.712C428.175 190.132 428.008 190.536 427.711 190.834C427.413 191.131 427.009 191.299 426.588 191.299Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M384.841 169.034C393.104 169.034 399.803 162.335 399.803 154.071C399.803 145.807 393.104 139.108 384.841 139.108C376.577 139.108 369.878 145.807 369.878 154.071C369.878 162.335 376.577 169.034 384.841 169.034Z"
          fill="#3F3D56"
        />
        <path
          d="M215.462 40.2484C216.452 35.2207 218.424 30.4373 221.263 26.1713C224.102 21.9054 227.753 18.2404 232.009 15.3857C240.603 9.62028 251.136 7.50517 261.29 9.50562C266.318 10.4961 271.101 12.4673 275.367 15.3064C279.633 18.1456 283.298 21.7972 286.153 26.0527C289.008 30.3082 290.996 35.0844 292.005 40.1085C293.014 45.1325 293.023 50.3061 292.033 55.3339L290.667 55.0649C292.596 45.2732 290.557 35.1161 284.997 26.8282C279.437 18.5403 270.813 12.8004 261.021 10.8713C251.229 8.94214 241.072 10.9818 232.785 16.5415C224.497 22.1012 218.757 30.7256 216.828 40.5173L215.462 40.2484Z"
          fill="#3F3D56"
        />
        <path
          d="M230.28 64.8666L208.172 65.7823C207.7 65.8029 207.229 65.7163 206.795 65.5289C206.361 65.3415 205.975 65.0583 205.666 64.7005C205.361 64.352 205.139 63.9389 205.016 63.4923C204.894 63.0456 204.874 62.577 204.958 62.1216C206.655 52.8704 206.16 43.3504 203.515 34.3248C203.31 33.6345 203.352 32.8948 203.632 32.2317C203.912 31.5686 204.413 31.0231 205.051 30.6884C214.106 25.9836 222.591 25.7451 230.268 29.9784C230.671 30.1971 231.021 30.5008 231.294 30.8685C231.567 31.2362 231.756 31.659 231.849 32.1074C233.847 41.9563 234.326 52.0531 233.269 62.0469C233.196 62.7989 232.853 63.4989 232.304 64.0173C231.754 64.5358 231.035 64.8375 230.28 64.8666Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M229.344 50.3969L212.44 51.097C212.232 51.1058 212.024 51.0735 211.828 51.0019C211.632 50.9302 211.452 50.8207 211.299 50.6796C211.145 50.5384 211.021 50.3684 210.933 50.1792C210.846 49.99 210.796 49.7854 210.787 49.5771C210.779 49.3687 210.811 49.1607 210.883 48.9649C210.955 48.7691 211.065 48.5894 211.206 48.4361C211.347 48.2827 211.517 48.1587 211.707 48.0711C211.896 47.9835 212.101 47.9341 212.309 47.9256L229.213 47.2255C229.421 47.2169 229.629 47.2493 229.825 47.3211C230.021 47.3928 230.2 47.5023 230.354 47.6435C230.507 47.7846 230.631 47.9546 230.719 48.1437C230.806 48.3328 230.856 48.5373 230.865 48.7455C230.873 48.9537 230.841 49.1616 230.769 49.3573C230.697 49.553 230.588 49.7327 230.447 49.886C230.305 50.0393 230.135 50.1634 229.946 50.2511C229.757 50.3387 229.553 50.3883 229.344 50.3969Z"
          fill="#FEFEFE"
        />
        <path
          d="M229.115 44.8359L212.21 45.536C211.79 45.5534 211.38 45.4031 211.07 45.118C210.76 44.8329 210.576 44.4365 210.559 44.016C210.542 43.5954 210.692 43.1852 210.977 42.8755C211.262 42.5658 211.658 42.382 212.079 42.3646L228.983 41.6644C229.404 41.647 229.814 41.7974 230.124 42.0824C230.433 42.3675 230.617 42.7639 230.635 43.1845C230.652 43.605 230.502 44.0153 230.217 44.325C229.932 44.6347 229.535 44.8184 229.115 44.8359Z"
          fill="#FEFEFE"
        />
        <path
          d="M374.965 57.8647H304.232C302.336 57.8625 300.519 57.1085 299.179 55.7681C297.838 54.4277 297.084 52.6103 297.082 50.7147V7.14999C297.084 5.25436 297.838 3.43698 299.179 2.09656C300.519 0.75614 302.336 0.00214899 304.232 0H374.965C376.86 0.00214162 378.678 0.756129 380.018 2.09655C381.359 3.43697 382.113 5.25435 382.115 7.14999V50.7147C382.113 52.6103 381.359 54.4277 380.018 55.7681C378.678 57.1086 376.86 57.8625 374.965 57.8647Z"
          fill="#E6E6E6"
        />
        <path
          d="M346.862 52.2532H309.204C307.429 52.2513 305.727 51.5452 304.471 50.2898C303.216 49.0345 302.51 47.3324 302.508 45.557V12.3075C302.51 10.5321 303.216 8.83008 304.471 7.57474C305.727 6.3194 307.429 5.61329 309.204 5.61133H369.993C371.768 5.6133 373.471 6.31942 374.726 7.57477C375.981 8.83012 376.687 10.5322 376.689 12.3075V22.426C376.68 30.334 373.535 37.9155 367.943 43.5072C362.351 49.099 354.77 52.2443 346.862 52.2532Z"
          fill="#FEFEFE"
        />
        <path
          d="M363.929 23.818H315.269C314.848 23.818 314.444 23.6508 314.146 23.3532C313.849 23.0556 313.682 22.6519 313.682 22.231C313.682 21.8101 313.849 21.4065 314.146 21.1089C314.444 20.8112 314.848 20.644 315.269 20.644H363.929C364.35 20.644 364.754 20.8112 365.051 21.1089C365.349 21.4065 365.516 21.8101 365.516 22.231C365.516 22.6519 365.349 23.0556 365.051 23.3532C364.754 23.6508 364.35 23.818 363.929 23.818Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M322.879 30.0892H315.267C314.847 30.0883 314.444 29.9207 314.147 29.6231C313.85 29.3256 313.684 28.9224 313.684 28.5021C313.684 28.0818 313.85 27.6786 314.147 27.381C314.444 27.0835 314.847 26.9159 315.267 26.915H322.879C323.299 26.9159 323.702 27.0835 323.999 27.381C324.296 27.6786 324.463 28.0818 324.463 28.5021C324.463 28.9224 324.296 29.3256 323.999 29.6231C323.702 29.9207 323.299 30.0883 322.879 30.0892Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M336.361 36.3597H315.268C314.847 36.3597 314.443 36.1925 314.146 35.8948C313.848 35.5972 313.681 35.1935 313.681 34.7726C313.681 34.3517 313.848 33.948 314.146 33.6504C314.443 33.3528 314.847 33.1855 315.268 33.1855H336.361C336.781 33.1864 337.184 33.354 337.481 33.6516C337.778 33.9491 337.945 34.3523 337.945 34.7726C337.945 35.193 337.778 35.5961 337.481 35.8937C337.184 36.1912 336.781 36.3588 336.361 36.3597Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M305.488 65.4058C309.851 58.3876 307.698 49.1615 300.68 44.7989C293.662 40.4362 284.436 42.589 280.073 49.6073C275.71 56.6255 277.863 65.8516 284.881 70.2142C291.9 74.5769 301.126 72.4241 305.488 65.4058Z"
          fill="#3F3D56"
        />
        <path
          d="M628.668 409H423.096C422.926 409 422.763 408.933 422.643 408.813C422.523 408.693 422.456 408.53 422.456 408.36C422.456 408.191 422.523 408.028 422.643 407.908C422.763 407.788 422.926 407.721 423.096 407.721H628.668C628.837 407.721 629 407.788 629.12 407.908C629.24 408.028 629.307 408.191 629.307 408.36C629.307 408.53 629.24 408.693 629.12 408.813C629 408.933 628.837 409 628.668 409Z"
          fill="#CCCCCC"
        />
        <path
          d="M93.4582 174.235C87.3193 158.006 87.8786 140.004 95.0131 124.187C102.148 108.371 115.273 96.037 131.501 89.8981C147.73 83.7592 165.732 84.3185 181.549 91.453C197.365 98.5875 209.699 111.713 215.838 127.941L214.536 128.434C211.561 120.569 207.066 113.368 201.308 107.24C195.55 101.113 188.641 96.1793 180.976 92.7218C173.312 89.2644 165.041 87.3504 156.637 87.0893C148.232 86.8281 139.859 88.2249 131.994 91.1999C124.129 94.1749 116.928 98.6698 110.8 104.428C104.673 110.186 99.7394 117.095 96.2819 124.76C92.8244 132.424 90.9105 140.695 90.6493 149.099C90.3882 157.504 91.785 165.877 94.76 173.742L93.4582 174.235Z"
          fill="#3F3D56"
        />
        <path
          d="M150.687 109.435H128.56C128.087 109.436 127.62 109.33 127.194 109.124C126.768 108.919 126.395 108.62 126.101 108.25C125.81 107.889 125.605 107.467 125.501 107.016C125.397 106.565 125.397 106.096 125.5 105.644C127.595 96.399 127.477 86.7899 125.155 77.5993C124.99 76.9489 125.04 76.2626 125.298 75.6433C125.556 75.0241 126.008 74.505 126.586 74.164C134.601 69.4984 143.161 69.6407 152.026 74.5884C152.446 74.8172 152.808 75.1389 153.084 75.5289C153.361 75.9189 153.544 76.3669 153.622 76.8386C155.199 86.7394 155.256 96.823 153.79 106.741C153.686 107.489 153.314 108.174 152.744 108.67C152.173 109.165 151.443 109.437 150.687 109.435Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M140.349 87.972H132.737C132.317 87.9711 131.914 87.8035 131.617 87.506C131.32 87.2084 131.153 86.8052 131.153 86.3849C131.153 85.9646 131.32 85.5614 131.617 85.2639C131.914 84.9663 132.317 84.7987 132.737 84.7979H140.349C140.769 84.7987 141.172 84.9663 141.469 85.2639C141.766 85.5614 141.933 85.9646 141.933 86.3849C141.933 86.8052 141.766 87.2084 141.469 87.506C141.172 87.8035 140.769 87.9711 140.349 87.972Z"
          fill="#FEFEFE"
        />
        <path
          d="M149.655 94.243H132.736C132.316 94.243 131.912 94.0758 131.614 93.7781C131.317 93.4805 131.149 93.0768 131.149 92.6559C131.149 92.235 131.317 91.8313 131.614 91.5337C131.912 91.2361 132.316 91.0688 132.736 91.0688H149.655C150.076 91.0697 150.478 91.2373 150.775 91.5349C151.072 91.8324 151.239 92.2356 151.239 92.6559C151.239 93.0763 151.072 93.4794 150.775 93.777C150.478 94.0745 150.076 94.2421 149.655 94.243Z"
          fill="#FEFEFE"
        />
        <path
          d="M77.8827 173.358H7.14995C5.25432 173.356 3.43694 172.602 2.09653 171.261C0.756116 169.921 0.00213792 168.103 0 166.208V122.643C0.00213792 120.748 0.756116 118.93 2.09653 117.59C3.43694 116.249 5.25432 115.495 7.14995 115.493H77.8827C79.7783 115.495 81.5957 116.249 82.9361 117.59C84.2765 118.93 85.0305 120.748 85.0327 122.643V166.208C85.0305 168.104 84.2765 169.921 82.9361 171.261C81.5957 172.602 79.7783 173.356 77.8827 173.358Z"
          fill="#E6E6E6"
        />
        <path
          d="M49.7797 167.746H12.1223C10.3469 167.744 8.64483 167.038 7.38943 165.783C6.13402 164.528 5.42783 162.826 5.42578 161.05V127.801C5.42783 126.025 6.13402 124.323 7.38943 123.068C8.64483 121.813 10.3469 121.106 12.1223 121.104H72.9111C74.6864 121.106 76.3885 121.813 77.6439 123.068C78.8992 124.323 79.6053 126.025 79.6073 127.801V137.919C79.5983 145.827 76.4529 153.409 70.861 159C65.2692 164.592 57.6877 167.737 49.7797 167.746Z"
          fill="#FEFEFE"
        />
        <path
          d="M66.8472 139.311H18.1866C17.7657 139.311 17.362 139.144 17.0644 138.846C16.7668 138.549 16.5996 138.145 16.5996 137.724C16.5996 137.303 16.7668 136.9 17.0644 136.602C17.362 136.304 17.7657 136.137 18.1866 136.137H66.8472C67.2681 136.137 67.6717 136.304 67.9694 136.602C68.267 136.9 68.4342 137.303 68.4342 137.724C68.4342 138.145 68.267 138.549 67.9694 138.846C67.6717 139.144 67.2681 139.311 66.8472 139.311Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M25.7971 145.582H18.1853C17.765 145.581 17.3621 145.414 17.0652 145.116C16.7683 144.819 16.6016 144.416 16.6016 143.995C16.6016 143.575 16.7683 143.172 17.0652 142.874C17.3621 142.577 17.765 142.409 18.1853 142.408H25.7971C26.2174 142.409 26.6202 142.577 26.9172 142.874C27.2141 143.172 27.3808 143.575 27.3808 143.995C27.3808 144.416 27.2141 144.819 26.9172 145.116C26.6202 145.414 26.2174 145.581 25.7971 145.582Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M39.2785 151.853H18.1853C17.765 151.852 17.3621 151.684 17.0652 151.387C16.7683 151.089 16.6016 150.686 16.6016 150.266C16.6016 149.845 16.7683 149.442 17.0652 149.145C17.3621 148.847 17.765 148.68 18.1853 148.679H39.2785C39.6994 148.679 40.1031 148.846 40.4007 149.144C40.6984 149.441 40.8656 149.845 40.8656 150.266C40.8656 150.687 40.6984 151.09 40.4007 151.388C40.1031 151.686 39.6994 151.853 39.2785 151.853Z"
          fill={colorPrimary}
          className="common-transition"
        />
        <path
          d="M105.811 179.508C110.173 172.49 108.021 163.264 101.002 158.901C93.9841 154.538 84.758 156.691 80.3954 163.709C76.0327 170.728 78.1855 179.954 85.2038 184.316C92.222 188.679 101.448 186.526 105.811 179.508Z"
          fill="#3F3D56"
        />
        <path
          d="M226.523 151.179H204.396C203.923 151.18 203.456 151.074 203.03 150.869C202.604 150.664 202.23 150.365 201.936 149.995C201.646 149.634 201.441 149.212 201.337 148.761C201.233 148.309 201.233 147.84 201.336 147.389C203.427 138.16 203.313 128.568 201.002 119.392C200.838 118.733 200.894 118.038 201.161 117.413C201.427 116.788 201.891 116.267 202.48 115.929C213.229 109.776 221.741 109.945 228.501 116.448C228.975 116.912 229.287 117.516 229.391 118.171C231.033 128.203 231.113 138.429 229.626 148.486C229.522 149.234 229.15 149.919 228.58 150.415C228.009 150.91 227.278 151.182 226.523 151.179Z"
          fill="#FF6584"
        />
        <path
          d="M217.575 130.412H209.964C209.543 130.411 209.14 130.243 208.844 129.946C208.547 129.648 208.38 129.245 208.38 128.825C208.38 128.405 208.547 128.001 208.844 127.704C209.14 127.406 209.543 127.239 209.964 127.238H217.575C217.996 127.239 218.399 127.406 218.695 127.704C218.992 128.001 219.159 128.405 219.159 128.825C219.159 129.245 218.992 129.648 218.695 129.946C218.399 130.243 217.996 130.411 217.575 130.412Z"
          fill="#FEFEFE"
        />
        <path
          d="M226.883 136.683H209.964C209.543 136.683 209.139 136.516 208.842 136.219C208.544 135.921 208.377 135.517 208.377 135.096C208.377 134.675 208.544 134.272 208.842 133.974C209.139 133.676 209.543 133.509 209.964 133.509H226.883C227.303 133.51 227.706 133.678 228.003 133.975C228.3 134.273 228.466 134.676 228.466 135.096C228.466 135.517 228.3 135.92 228.003 136.217C227.706 136.515 227.303 136.683 226.883 136.683Z"
          fill="#FEFEFE"
        />
      </g>
      <defs>
        <clipPath id="clip0_197_2941">
          <rect width="629.307" height="409" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
