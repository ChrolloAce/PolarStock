# PolarStock - Stock Image Generator SaaS

PolarStock is a SaaS platform that helps users generate relevant stock images for their websites, apps, and software projects without the hassle of endless searching. Simply provide information about your business, and our app will find the perfect images for your project.

## Features

- Integration with Pexels API
- Smart search queries based on business type
- Image customization options
- Responsive design for all devices
- Modern, clean UI with Tailwind CSS

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Pexels API

## Getting Started

First, clone the repository and install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key
```

You can get your API key by registering at [Pexels](https://www.pexels.com/api/).

## License

MIT

## Acknowledgements

- [Pexels](https://www.pexels.com) for providing the stock image API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [JSZip](https://stuk.github.io/jszip/) for client-side ZIP generation
