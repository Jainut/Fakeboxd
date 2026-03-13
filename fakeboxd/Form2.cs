using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;

namespace fakeboxd
{
    public partial class Form2 : Form
    {
        Form form;
        string placeholder = "Buscar filmes...";
        public Form2(Form formP)
        {
            InitializeComponent();
            form = formP;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            form.Show();
            this.Close();
        }

        public void TextBox1_Leave(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(textBox1.Text))
            {
                textBox1.Text = placeholder;
                textBox1.ForeColor = Color.Gray;
            }
        }

        public void TextBox1_Enter(object sender, EventArgs e)
        {
            if (textBox1.Text == placeholder)
            {
                textBox1.Text = "";
                textBox1.ForeColor = Color.White;
            }
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private async void textBox1_KeyDown(object sender, KeyEventArgs e)
        {

        }

        private async Task Listar()
        {
            using (var client = new HttpClient())
            {
                //var request;
            }
        }

        private async void button2_Click(object sender, EventArgs e)
        {
            BuscarFilmes();
        }

        private async Task<JsonElement[]> BuscarFilmes()
        {
            string nomeFilme = textBox1.Text;
            string token = Config.BearerToken;

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Baarer", token);
                string urlSearch = $"{Config.URL}/3/search/movie?api_key={Config.APIKey}&query={nomeFilme}";

                HttpResponseMessage response = await client.GetAsync(urlSearch);

                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    var resultados = JsonSerializer.Deserialize<JsonElement>(json);

                    var filmes = resultados.GetProperty("results").EnumerateArray().ToArray();

                    foreach (var filme in filmes)
                    {
                        string titulo = filme.GetProperty("title").GetString();
                        string sinopse = filme.GetProperty("overview").GetString();
                        var posterPath = filme.GetProperty("poster_path").GetString();

                        
                    }

                    return filmes;
                }
                else
                {
                    string erro = "Não foi possível encontrar resultados";
                    MessageBox.Show($"{erro}");
                    return Array.Empty<JsonElement>();
                }
            }
        }

        private async Task ExibirFilme()
        {
            flowLayoutPanel1.Controls.Clear();
            var filmes = await BuscarFilmes();

            int largura = 200;
            int altura = 300;

            foreach (var filme in filmes)
            {
                PictureBox pic = new PictureBox();
                pic.Size = new Size(largura, altura);
                pic.SizeMode = new PictureBoxSizeMode();
                pic.Margin = new Padding(20);
                pic.LoadAsync();

                Label label = new Label();
            }
        }
        private async void flowLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {
            flowLayoutPanel1.Controls.Clear();
            flowLayoutPanel1.AutoScroll = true;
        }
    }
}