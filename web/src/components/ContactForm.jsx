// src/components/ContactForm.jsx
export default function ContactForm() {
  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded"/>
          <textarea placeholder="Message" className="w-full p-2 border rounded h-32"></textarea>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Send</button>
        </form>
      </div>
    </section>
  );
}
