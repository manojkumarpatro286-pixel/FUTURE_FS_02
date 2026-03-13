let leads = JSON.parse(localStorage.getItem("leads")) || [];

function displayLeads(){
function displayLeads(){

let table=document.getElementById("leadTable");
table.innerHTML="";

leads.forEach((lead,index)=>{

table.innerHTML += `
<tr>
<td>${lead.name}</td>
<td>${lead.email}</td>
<td>${lead.source}</td>
<td>${lead.status}</td>
<td>${lead.notes}</td>
<td>
<button onclick="deleteLead(${index})">Delete</button>
</td>
</tr>
`;

});

updateCharts();

}


}

function addLead(){

let lead={

name:document.getElementById("name").value,
email:document.getElementById("email").value,
source:document.getElementById("source").value,
status:document.getElementById("status").value,
notes:document.getElementById("notes").value

};

leads.push(lead);

localStorage.setItem("leads",JSON.stringify(leads));

displayLeads();

document.querySelectorAll("input").forEach(i=>i.value="");

}

function deleteLead(index){

leads.splice(index,1);

localStorage.setItem("leads",JSON.stringify(leads));

displayLeads();

}

function searchLead(){

let search=document.getElementById("search").value.toLowerCase();

let rows=document.querySelectorAll("#leadTable tr");

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(search) ? "" : "none";

});
document.getElementById("totalLeads").innerText = leads.length;
document.getElementById("newLeads").innerText = newCount;
document.getElementById("contactedLeads").innerText = contactedCount;
document.getElementById("convertedLeads").innerText = convertedCount;

}

displayLeads();
let statusChart;
let sourceChart;

function updateCharts(){

let newCount = 0;
let contactedCount = 0;
let convertedCount = 0;

let sources = {};

leads.forEach(lead=>{

if(lead.status=="New") newCount++;
if(lead.status=="Contacted") contactedCount++;
if(lead.status=="Converted") convertedCount++;

sources[lead.source] = (sources[lead.source] || 0) + 1;

});

/* Status Pie Chart */

if(statusChart) statusChart.destroy();

statusChart = new Chart(
document.getElementById("statusChart"),
{
type:'pie',
data:{
labels:["New","Contacted","Converted"],
datasets:[{
data:[newCount,contactedCount,convertedCount],
backgroundColor:["#3b82f6","#f59e0b","#10b981"]
}]
}
});

/* Source Bar Chart */

if(sourceChart) sourceChart.destroy();

sourceChart = new Chart(
document.getElementById("sourceChart"),
{
type:'bar',
data:{
labels:Object.keys(sources),
datasets:[{
label:"Leads",
data:Object.values(sources)
}]
}
});

}