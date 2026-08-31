const cfg=window.AZ_CONFIG; const db=supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_PUBLISHABLE_KEY);
async function loadPublishedNews(){
 const {data,error}=await db.from('news').select('id,title,excerpt,body,image_url,author,published_at').eq('status','published').order('published_at',{ascending:false});
 const box=document.getElementById('liveNews'); if(!box)return;
 if(error){box.innerHTML='<p>News is temporarily unavailable.</p>';return}
 box.innerHTML=data.length?data.map(n=>`<article class="card"><img src="${n.image_url||'assets/team-hands.jpeg'}" alt=""><h3>${esc(n.title)}</h3><p>${esc(n.excerpt||n.body.slice(0,150))}</p><small>${esc(n.author||'Academia-Zambia')} • ${new Date(n.published_at||Date.now()).toLocaleDateString()}</small><div><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank">Share to Facebook</a></div></article>`).join(''):'No published news yet.';
}
function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
loadPublishedNews();