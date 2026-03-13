using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

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
				textBox1.ForeColor = Color.Black;
			}
		}

		private void textBox1_TextChanged(object sender, EventArgs e)
		{

		}

		private void textBox1_KeyDown(object sender, KeyEventArgs e)
		{
			
		}

		private async Task Listar() 
		{
			using (var client = new HttpClient()) 
			{
				//var request;
			}
		}
	}
}