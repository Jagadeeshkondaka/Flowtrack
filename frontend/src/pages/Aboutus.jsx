import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 items-center gap-12">
        
        {/* LEFT TEXT */}
        <div>
          <h1 className="text-5xl font-bold mb-6">
            About Us
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Flowtrack’s company and culture are a lot like our product.
            They’re crafted, not cobbled, for a delightful experience.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1661277666101-01fb123f2a4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlYW0lMjB3b3JrfGVufDB8fDB8fHww" // 👉 replace with your image
            alt="Team"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT IMAGE */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D" // 👉 replace with your image
            alt="Office"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* RIGHT TEXT */}
        <div>
          <h2 className="text-4xl font-bold mb-6 leading-snug">
            Our Mission: Helping Teams Work Better
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            We believe not just in building tools, but in building better
            workflows. Flowtrack helps teams stay aligned, productive,
            and focused on what truly matters. 
            Collaboration becomes seamless, and progress becomes visible.
          </p>
        </div>
      </section>
      <div className="bg-blue-600 text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold py-3">Have any questions?</h1>
        <p className="text-xl "> We'd love to hear from you. Reach out to us for any queries,
             feedback, or support.
        </p>
        <button className="bg-white text-black px-3 py-2 rounded-sm ">Contact us</button>
        <p className="text-lg mb-4">for any queries mail to :<span className="bg-blue-800"> jagadeeshkondaka123@gmail.com</span></p>
      </div>
        <footer className="bg-[#0b0014] text-gray-300 ">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-white text-xl font-semibold">Flowtrack</h2>
            <p className="mt-4 text-sm text-gray-400">
              Building the future with powerful and intuitive tools.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Docs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Social</h3>
            <ul className="space-y-2 text-sm">
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>GitHub</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 text-center text-sm py-6 text-gray-500">
          © 2026 Flowtrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;