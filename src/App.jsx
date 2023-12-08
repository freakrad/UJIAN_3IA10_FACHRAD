// Fungsi useState akan mereturn pasangan nilai dari state dan fungsi 
// untuk mengubah state tersebut dalam bentuk sebuah array.
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // mengambil data postingan dari local storage dan menjadikannya sebagai data awal untuk variabel posts. 
  // menggunakan JSON.parse() untuk mengubah data dari string menjadi objek JavaScript.
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')))
  // Mendeklarasikan state title dan content dengan nilai awal berupa string kosong. 
  // State ini akan digunakan untuk menyimpan judul dan isi dari post yang akan
  // ditambahkan atau diubah.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // metode ini akan menjaga data postingan saat halaman direfresh atau browser ditutup. 
    useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);


// Kedua fungsi berikut menggunakan state title dan content untuk menambahkan atau mengubah post. 
// Setelah post berhasil ditambahkan atau diubah, 
// state title dan content akan direset menjadi string kosong.

  // Mendefinisikan fungsi addPost yang akan menambahkan post baru ke dalam state posts. 
  // Fungsi ini akan dipanggil ketika tombol “Add Post” ditekan.
  const addPost = () => {
    const newPost = { title, content };
    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
  };
  // Mendefinisikan fungsi editPost yang akan mengubah post yang sudah ada di dalam state posts. 
  // Fungsi ini akan dipanggil ketika tombol “Edit Post” ditekan.
  const editPost = (index) => {
    const newPosts = [...posts];
    newPosts[index].title = title;
    newPosts[index].content = content;
    setPosts(newPosts);
    setTitle('');
    setContent('');
  };

  // Digunakan untuk menghapus post yang sudah ada di dalam state posts. 
  // Fungsi ini akan dipanggil ketika tombol “Delete Post” ditekan.
  const deletePost = (index) => {
    // Membuat salinan dari array posts menggunakan spread operator
    // tidak merubah state posts secara langsung.
    const newPosts = [...posts];
    // Menggunakan fungsi splice untuk menghapus satu elemen dari array newPosts 
    // pada index yang diberikan sebagai parameter.
    newPosts.splice(index, 1);
    // Menggunakan fungsi setPosts untuk mengubah state posts 
    // menjadi newPosts yang sudah dihapus elemennya.
    setPosts(newPosts);
  };

  return (
    <div className="App">
      <h1 className="App-header">Social Media Simple</h1>
      <form className="App-form">
      {/* Digunakan oleh pengguna untuk memasukkan judul postingannya. */}
        <input
          type="text"
          placeholder="Title"
          // Nilai saat ini dari kolom input disimpan dalam variabel state "title"
          value={title}
          // setiap kali pengguna mengetik dalam kolom input, fungsi "setTitle" 
          // dipanggil untuk memperbarui variabel state "title".
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <textarea
        // mendefinisikan teks panduan yang ditampilkan di dalam area input 
        // saat ini tidak ada teks yang dimasukkan. 
          placeholder="Content"
          // digunakan untuk menetapkan teks yang telah dimasukkan pengguna.
          value={content}
          // menjalankan fungsi saat nilai dalam area input berubah.
          onChange={(e) => setContent(e.target.value)}
          // mengatur gaya area input.
          style={{ marginBottom: '10px' }}
        />
        {/* fungsi addPost yang telah didefinisikan sebelumnya 
        akan dipanggil untuk menambahkan postingan baru. */}
        <button type="button" onClick={addPost}>
          Post
        </button>
        <br></br>
      </form>

      <div className="App-posts">
        {/* Mengambil daftar postingan dari array posts. */}
        {posts.map((post, index) => (
          // Atribut key diperlukan untuk menyediakan "petunjuk" 
          // bagi React tentang urutan dan identitas dari setiap elemen.
          <div className="App-post" key={index}>
            <h2 className="App-post-title">{post.title}</h2>
            <p className="App-post-content">{post.content}</p>
            <div className="App-post-actions">
              {/* Berfungsi untuk mengubah postingan yang dipilih. */}
              {/* fungsi editPost akan dipanggil dengan parameter index, yang merupakan 
              indeks dari postingan yang akan diubah dalam array posts. */}
              <button className="App-post-action" onClick={() => editPost(index)}>
                Edit
              </button>
              {/* Berfungsi untuk menghapus postingan yang dipilih. */}
              <button className="App-post-action" onClick={() => deletePost(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;