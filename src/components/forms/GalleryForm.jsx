/* src/components/admin/GalleryForm.jsx */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

const CATS = ['campaign','community','speeches','meetings'];

export default function GalleryForm({ id, onSuccess, onCancel }){
  const [form, setForm] = useState({
    title:'', description:'', category:'campaign', location:'', date:'',
    photographerName:'', photographerCredit:'', emoji:'📸', featured:false, published:true
  });
  const [fileQueue, setFileQueue] = useState([]); // [{file:File, preview:string}]
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    if(!id) return;               // create mode
    (async()=>{
      const {data} = await axios.get(`${API}/gallery/${id}`);
      const d = data.data;
      setForm({
        title:d.title, description:d.description, category:d.category, location:d.location,
        date:d.date? d.date.substring(0,10):'',
        photographerName:d.photographer?.name||'', photographerCredit:d.photographer?.credit||'',
        emoji:d.image, featured:d.featured, published:d.published
      });
    })();
  },[id]);

  const handleChange = e=>{
    const t = e.target;
    setForm({...form, [t.name]: t.type==='checkbox'?t.checked:t.value});
  };

  const addFiles = e=>{
    const files = Array.from(e.target.files);
    const newQ = files.map(file=> ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFileQueue(q=>[...q, ...newQ]);
  };

  const removeFile = idx=> setFileQueue(q=>q.filter((_,i)=>i!==idx));

  const handleSubmit = async e=>{
    e.preventDefault();
    if(fileQueue.length===0 && !id){
      return alert('Please add at least one image/video');
    }
    setUploading(true);
    try{
      /* 1.  if we have files, upload them one-by-one and collect created ids */
      const createdIds = [];
      for(let i=0;i<fileQueue.length;i++){
        const f = fileQueue[i].file;
        const payload = new FormData();
        Object.keys(form).forEach(k=> payload.append(k, form[k]));
        payload.append('media', f);        // field name your multer expects
        const {data} = id
          ? await axios.put(`${API}/gallery/${id}`, payload)  // update with new media
          : await axios.post(`${API}/gallery`, payload);
        createdIds.push(data.data._id);
        setProgress(Math.round((i+1)/fileQueue.length*100));
      }
      /* 2.  if we are in “edit” mode and did NOT add new files, just send text update */
      if(id && fileQueue.length===0){
        const payload = new FormData();
        Object.keys(form).forEach(k=> payload.append(k, form[k]));
        await axios.put(`${API}/gallery/${id}`, payload);
      }
      onSuccess();
    }finally{
      setUploading(false);
      setProgress(0);
      setFileQueue([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-4xl">
      <h3 className="text-xl font-bold">{id?'Edit':'Add'} Gallery Item</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title (min 10)" required className="input" />
        <select name="category" value={form.category} onChange={handleChange} className="input">
          {CATS.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="input" />
        <input name="date" type="date" value={form.date} onChange={handleChange} required className="input" />
        <input name="photographerName" value={form.photographerName} onChange={handleChange} placeholder="Photographer name" className="input" />
        <input name="photographerCredit" value={form.photographerCredit} onChange={handleChange} placeholder="Credit line" className="input" />
      </div>

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (min 20)" required rows="3" className="input" />

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2"><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="published" checked={form.published} onChange={handleChange} /> Published</label>
        <input name="emoji" value={form.emoji} onChange={handleChange} placeholder="Emoji" className="input w-24" />
      </div>

      {/* MULTI-FILE ZONE */}
      <div className="border-2 border-dashed rounded p-4">
        <input type="file" multiple accept="image/*,video/*" onChange={addFiles} />
        {fileQueue.length>0 && (
          <div className="grid grid-cols-6 gap-2 mt-3">
            {fileQueue.map((q,idx)=>(
              <div key={idx} className="relative">
                <img src={q.preview} className="h-20 w-full object-cover rounded" alt="" />
                <button type="button" onClick={()=>removeFile(idx)} className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded">&times;</button>
              </div>
            ))}
          </div>
        )}
        {uploading && <div className="mt-2 text-sm">Uploading… {progress}%</div>}
      </div>

      <div className="flex gap-2">
        <button disabled={uploading} className="btn-primary">{uploading?'Uploading…':(id?'Update':'Create')}</button>
        {id && <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>}
      </div>
    </form>
  );
}